/**
 * Client-side utilities (for use in 'use client' components)
 */

/**
 * Get avatar URL with proper base URL handling
 * Use this in client components
 */
export function getAvatarUrl(avatarUrl: string | undefined | null): string {
  if (!avatarUrl) return "";
  
  // If already a full URL, return as is
  if (avatarUrl.startsWith("http")) {
    return avatarUrl;
  }
  
  // Otherwise, prepend API URL
  // In client components, NEXT_PUBLIC_* vars are available at build time
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  return `${apiUrl}${avatarUrl}`;
}
