'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { RiLoader4Fill } from 'react-icons/ri';

const linkSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  url: z.string().url('Enter a valid URL'),
});

type LinkForm = z.infer<typeof linkSchema>;

export default function AddLinkPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LinkForm>({
    resolver: zodResolver(linkSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: LinkForm) => {
    const res = await fetch('/api/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      alert('Failed to add link');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Add New Link</h2>
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
          {isSubmitting ? (<><RiLoader4Fill className="w-6 h-6 animate-spin duration-200" /> {' Saving'}</>) : 'Add Link'}
        </button>
      </form>
    </div>
  );
}
