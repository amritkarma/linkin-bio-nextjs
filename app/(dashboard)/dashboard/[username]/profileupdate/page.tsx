"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { RiLoader4Fill } from "react-icons/ri";

export default function EditProfilePage() {
  const { username } = useParams() as { username: string };

  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setBio(data.bio || "");
        if (data.avatar_url) {
          setAvatarPreview(
            data.avatar_url.startsWith("http")
              ? data.avatar_url
              : `${apiUrl}${data.avatar_url}`
          );
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    }

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("bio", bio);
      if (avatar) formData.append("avatar", avatar);

      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok) {
        let message = "Failed to update profile";
        try {
          const data = await res.json();
          message = data.detail || message;
        } catch {
          // Ignore JSON parse error
        }
        throw new Error(message);
      }

      router.push(`/${username}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (file: File | null) => {
    setAvatar(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold">Edit Profile</h2>

      {error && <p className="text-red-600">{error}</p>}

      <div>
        {avatarPreview && (
          <Image
            src={avatarPreview}
            alt="Avatar preview"
            width={96}
            height={96}
            className="w-24 h-24  rounded-full object-cover"
          />
        )}
        <label className="block font-medium mt-2 mb-1">Avatar</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleAvatarChange(e.target.files?.[0] || null)}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="border rounded w-full p-2"
          rows={4}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-black flex text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        {loading ? (<><RiLoader4Fill className="w-6 h-6 animate-spin duration-200" /> {' Updating'}</>) : "Save Changes"}
      </button>
    </form>
  );
}
