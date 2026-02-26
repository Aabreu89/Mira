import { supabase } from '../lib/supabase';
import { Post, Comment, ValidationStatus } from '../types';

export const communityService = {
    async fetchPosts(): Promise<Post[]> {
        const { data, error } = await supabase
            .from('posts')
            .select(`
        *,
        profiles (name, avatar_url, bio),
        comments (
          id, content, created_at, author_id,
          profiles (name, avatar_url)
        ),
        post_votes (id, user_id, vote_type)
      `)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching posts:', error);
            return [];
        }

        if (!data) return [];

        return data.map((row: any) => {
            const likesCount = row.post_votes?.filter((v: any) => v.vote_type === 'like').length || 0;
            const usefulCount = row.post_votes?.filter((v: any) => v.vote_type === 'useful').length || 0;
            const fakeCount = row.post_votes?.filter((v: any) => v.vote_type === 'fake').length || 0;

            const formattedComments: Comment[] = (row.comments || []).map((c: any) => ({
                id: c.id,
                authorId: c.author_id,
                authorName: c.profiles?.name || 'Membro Oculto',
                authorAvatar: c.profiles?.avatar_url || '',
                content: c.content,
                timestamp: new Date(c.created_at).toLocaleDateString() + ' ' + new Date(c.created_at).toLocaleTimeString().slice(0, 5),
                likes: 0 // Simplification for MVP
            }));

            return {
                id: row.id,
                authorId: row.author_id,
                authorName: row.profiles?.name || 'Membro Oculto',
                authorAvatar: row.profiles?.avatar_url || '',
                authorBio: row.profiles?.bio || '',
                title: row.title || 'Post Comunitário',
                content: row.content,
                category: row.category,
                workTopic: row.work_topic,
                geoTag: row.geo_tag,
                backgroundImage: row.background_image,
                tags: row.tags || [],
                likes: likesCount,
                comments: formattedComments,
                isVerified: row.is_verified || false,
                isFraudWarning: row.is_fraud_warning || false,
                urgency: row.urgency || 0,
                validationStatus: (row.validation_status as ValidationStatus) || 'pending',
                usefulVotes: usefulCount,
                fakeVotes: fakeCount,
                reviewVotes: 0,
                timestamp: new Date(row.created_at).toLocaleDateString(),
                reports: 0
            };
        });
    },

    async createPost(postData: any) {
        const { data, error } = await supabase.from('posts').insert([
            {
                author_id: postData.authorId,
                title: postData.title,
                content: postData.content,
                category: postData.category,
                background_image: postData.backgroundImage,
                validation_status: 'pending'
            }
        ]).select().single();

        if (error) {
            console.error('Error creating post:', error);
            throw error;
        }
        return data;
    },

    async deletePost(postId: string, userId: string) {
        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', postId)
            .eq('author_id', userId);

        if (error) {
            console.error('Error deleting post:', error);
            throw error;
        }
    },

    async createComment(postId: string, authorId: string, content: string) {
        const { data, error } = await supabase.from('comments').insert([
            {
                post_id: postId,
                author_id: authorId,
                content
            }
        ]).select().single();

        if (error) throw error;
        return data;
    },

    async voteOrLike(postId: string, userId: string, voteType: 'useful' | 'fake' | 'like') {
        const inTypes = voteType === 'like' ? ['like'] : ['useful', 'fake'];
        const { data: existing } = await supabase
            .from('post_votes')
            .select('id, vote_type')
            .eq('post_id', postId)
            .eq('user_id', userId)
            .in('vote_type', inTypes)
            .single();

        if (existing) {
            if (existing.vote_type === voteType) {
                // Toggle off (Unlike or Remove Vote)
                const { error } = await supabase
                    .from('post_votes')
                    .delete()
                    .eq('id', existing.id);
                if (error) throw error;
                return 'removed';
            }

            // Update existing vote (Change from useful to fake or vice versa)
            const { error } = await supabase
                .from('post_votes')
                .update({ vote_type: voteType })
                .eq('id', existing.id);

            if (error) throw error;
            return 'updated';
        } else {
            // Insert new vote
            const { error } = await supabase
                .from('post_votes')
                .insert([{
                    post_id: postId,
                    user_id: userId,
                    vote_type: voteType
                }]);

            if (error) throw error;
            return 'inserted';
        }
    }
};
