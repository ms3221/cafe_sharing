"use client";

import { Instagram as InstagramIcon } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { instagramPosts } from "@/data/gallery";
import { cafeInfo } from "@/data/cafe-info";

export function Instagram() {
  return (
    <section className="py-24 bg-cream-100">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle subtitle="Instagram" title="인스타그램" />

        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {instagramPosts.map((post) => (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-xl overflow-hidden bg-warm-200"
              >
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url('${post.thumbnail}')` }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center text-white p-4">
                    <InstagramIcon size={28} className="mx-auto mb-2" />
                    {post.caption && (
                      <p className="text-xs leading-relaxed">{post.caption}</p>
                    )}
                    <p className="text-xs mt-1 text-white/70">게시물 보기</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="text-center mt-8">
            <a
              href={cafeInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full hover:opacity-90 transition-opacity"
            >
              <InstagramIcon size={18} />
              팔로우하기
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
