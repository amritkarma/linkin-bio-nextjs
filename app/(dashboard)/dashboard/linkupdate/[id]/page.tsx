'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiLoader4Fill } from 'react-icons/ri';

const linkSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  url: z.string().url('Enter a valid URL'),
});

type LinkForm = z.infer<typeof linkSchema>;

export default function EditLinkPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LinkForm>({
    resolver: zodResolver(linkSchema),
  });

  useEffect(() => {
    const loadLink = async () => {
      const res = await fetch(`/api/links/${id}`, { credentials: 'include' });
      if (res.ok) {
        const link = await res.json();
        setValue('title', link.title);
        setValue('url', link.url);
      } else {
        const text = await res.text();
        console.error(`GET /api/links/${id} failed:`, res.status, text);
      }
    };
    if (id) loadLink();
  }, [id, setValue]);

  const onSubmit = async (data: LinkForm) => {
    const res = await fetch(`/api/links/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include', // ✅ Add this line
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      const error = await res.text();
      alert(`Failed to update link: ${error}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Edit Link</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            {...register('title')}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">URL</label>
          <input
            type="url"
            {...register('url')}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.url && <p className="text-sm text-red-600">{errors.url.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 flex text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? (<><RiLoader4Fill className="w-6 h-6 animate-spin duration-200" /> {' Updating'}</>) : 'Update Link'}
        </button>
      </form>
    </div>
  );
}
