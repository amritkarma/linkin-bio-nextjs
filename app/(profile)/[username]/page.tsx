"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { RiLoader4Fill } from "react-icons/ri";

type LinkItem = {
  id: number;
  title: string;
  url: string;
};

type Profile = {
  username: string;
  bio?: string;
  avatar_url?: string;
  links?: LinkItem[];
};

export default function PublicProfilePage() {
  const { username } = useParams() as { username: string };
  const [profile, setProfile] = useState<Profile | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const [profileRes, meRes] = await Promise.all([
          fetch(`/api/links?username=${username}`),
          fetch("/api/auth/me"),
        ]);

        if (!profileRes.ok) {
          const err = await profileRes.json();
          throw new Error(err.detail || "Failed to load profile");
        }

        const profileData = await profileRes.json();
        setProfile(profileData);

        if (meRes.ok) {
          const meData = await meRes.json();
          setCurrentUser(meData.username);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred while loading profile.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [username]);

  const handleDelete = async (id: number, title: string, url: string) => {
    toast((t) => (
      <span className="flex flex-col gap-2 text-sm">
        <div>
          <strong className="block text-red-600">Are you sure you want to delete this link?</strong>
          <div className="mt-1">
            <div><strong>Title:</strong> {title}</div>
            <div><strong>URL:</strong> <a href={url} target="_blank" className="text-blue-600 underline">{url}</a></div>
          </div>
        </div>
        <span className="flex justify-end gap-2">
          <button
            className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
            onClick={async () => {
              toast.dismiss(t.id);
              const deletingToast = toast.loading('Deleting link...');
              try {
                const res = await fetch(`/api/links/${id}`, { method: 'DELETE' });
                if (!res.ok) throw new Error('Failed to delete');

                setProfile((prev) =>
                  prev
                    ? {
                      ...prev,
                      links: prev.links?.filter((link) => link.id !== id) || [],
                    }
                    : null
                );
                toast.success('Link deleted successfully', { id: deletingToast });
              } catch {
                toast.error('Failed to delete link.', { id: deletingToast });
              }
            }}
          >
            Yes
          </button>
          <button
            className="text-gray-700 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </span>
      </span>
    ), { duration: 10000 });
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/${username}`;

    if (navigator.share) {
      navigator
        .share({
          title: `${username}'s Link in Bio`,
          text: profile?.bio || "Check out my profile!",
          url: shareUrl,
        })
        .catch((err) => console.error("Share failed:", err));
    }
  };

  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center text-center text-gray-500">
        <RiLoader4Fill className='w-6 h-6 text-center animate-spin duration-200' />
      </div>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  const isOwner = currentUser === profile?.username;
  const avatarSrc = profile?.avatar_url?.startsWith("http")
    ? profile.avatar_url
    : `http://localhost:8000${profile?.avatar_url}`;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-20 flex flex-col items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      
      {profile?.avatar_url && (
        <div className="flex justify-center mb-4">
          <Image
            src={avatarSrc}
            alt={`${profile.username}'s avatar`}
            width={96}
            height={96}
            className="w-24 h-24 rounded-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/default-avatar.png";
            }}
          />
        </div>
      )}

      <h1 className="text-2xl font-bold mb-2">@{profile?.username}</h1>
      {profile?.bio && <p className="text-gray-600 mb-4">{profile.bio}</p>}

      {isOwner && (
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <Link
            href={`/dashboard/${username}/profileupdate`}
            className="bg-zinc-900 text-white px-4 py-2 rounded-full hover:bg-zinc-700"
          >
            Edit Profile
          </Link>
          <Link
            href="/dashboard/linkadd"
            className="bg-zinc-900 text-white px-4 py-2 rounded-full hover:bg-zinc-700"
          >
            Add New Link
          </Link>
        </div>
      )}

      <button
        onClick={handleShare}
        className="my-6 bg-transparent hover:bg-white text-center text-white hover:text-black cursor-pointer font-medium px-2 py-2 rounded-full transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
        </svg>

      </button>

      {profile?.links?.length ? (
        <ul className="w-full space-y-3">
          {profile.links.map((link) => (
            <Link href={link.url} key={link.id} target="_blank" rel="noopener noreferrer" className="dark:bg-zinc-900 text-black dark:text-white hover:text-white flex justify-between items-center p-4 rounded-lg hover:bg-zinc-700 transition-all">
              <p className="font-semibold">{link.title}</p>
              {isOwner && (
                <div className="flex gap-3 items-center">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/dashboard/linkupdate/${link.id}`);
                    }}
                    title="Edit"
                    className="text-white hover:text-blue-400 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(link.id, link.title, link.url)
                    }}
                    title="Delete"
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </Link>
          ))}
        </ul>
      ) : (
        <p>No links found.</p>
      )}
    </div>
  );
}
