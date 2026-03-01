import { supabase } from '../lib/supabase';
import { Post, Comment, User } from '../types';

export const adminService = {
    /**
     * Fetch all user profiles for moderation
     */
    async fetchUsers(): Promise<User[]> {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('name');

        if (error) {
            console.error('Error fetching users:', error);
            return [];
        }

        return data.map((profile: any) => ({
            id: profile.id,
            name: profile.name,
            email: profile.email, // Note: This might be null if not in public profile
            avatar: profile.avatar_url,
            reputation: profile.reputation || 0,
            trustLevel: profile.trust_level || 'Observador',
            role: profile.role || 'member',
            isMuted: profile.is_muted || false,
            isBlocked: profile.is_blocked || false,
            registrationDate: profile.created_at
        }));
    },

    /**
     * Block or unblock a user
     */
    async toggleBlockUser(userId: string, isBlocked: boolean) {
        const { error } = await supabase
            .from('profiles')
            .update({ is_blocked: isBlocked })
            .eq('id', userId);

        if (error) throw error;
    },

    /**
     * Permanently delete a user
     */
    async deleteUser(userId: string) {
        // Due to RLS and FKs, we might need a stored procedure or to delete related data first
        // For now, we attempt to delete the profile (which should trigger a CASCADE if set up)
        const { error } = await supabase
            .from('profiles')
            .delete()
            .eq('id', userId);

        if (error) throw error;
    },

    /**
     * Block an email address
     */
    async blockEmail(email: string) {
        const { error } = await supabase
            .from('denied_emails')
            .insert([{ email }]);

        if (error) throw error;
    },

    /**
     * Fetch all denied emails
     */
    async fetchDeniedEmails(): Promise<string[]> {
        const { data, error } = await supabase
            .from('denied_emails')
            .select('email');

        if (error) return [];
        return data.map(d => d.email);
    },

    /**
     * Unblock an email
     */
    async unblockEmail(email: string) {
        const { error } = await supabase
            .from('denied_emails')
            .delete()
            .eq('email', email);

        if (error) throw error;
    },

    /**
     * Fetch all reported posts
     */
    async fetchReportedPosts(): Promise<Post[]> {
        const { data, error } = await supabase
            .from('posts')
            .select('*, profiles(name, avatar_url)')
            .gt('reports', 0)
            .order('reports', { ascending: false });

        if (error || !data) return [];

        return data.map((row: any) => ({
            id: row.id,
            authorId: row.author_id,
            authorName: row.profiles?.name || 'Membro Oculto',
            authorAvatar: row.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(row.profiles?.name || 'M')}`,
            title: row.title,
            content: row.content,
            category: row.category,
            reports: row.reports || 0,
            timestamp: new Date(row.created_at).toLocaleDateString(),
            validationStatus: row.validation_status
        } as any));
    },

    /**
     * Delete a post as admin
     */
    async adminDeletePost(postId: string) {
        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', postId);

        if (error) throw error;
    }
};
