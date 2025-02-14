import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function ProjectCardSkeleton() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="space-y-4">
        <div className="aspect-video w-full">
          <Skeleton height="100%" />
        </div>
        <div className="p-6 space-y-4">
          <Skeleton width={200} height={24} />
          <Skeleton count={2} />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} width={60} height={24} />
            ))}
          </div>
          <div className="flex gap-4">
            <Skeleton width={80} height={36} />
            <Skeleton width={80} height={36} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export function ProjectsSectionSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton width={200} height={32} />
          <div className="flex gap-2">
            <Skeleton width={40} height={40} />
            <Skeleton width={40} height={40} />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkillCardSkeleton() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="space-y-6 p-6">
        <div className="flex items-start gap-4">
          <Skeleton circle width={48} height={48} />
          <div className="space-y-2 flex-1">
            <Skeleton width={150} height={24} />
            <Skeleton width={200} />
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <Skeleton width={100} />
                <Skeleton width={40} />
              </div>
              <Skeleton height={8} />
            </div>
          ))}
        </div>
      </div>
    </SkeletonTheme>
  );
}

export function AboutSkeleton() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <Skeleton width={200} height={32} className="mx-auto" />
          <Skeleton width={300} className="mx-auto" />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Skeleton circle width={208} height={208} />
          <div className="flex-1 space-y-4">
            <Skeleton width={250} height={28} />
            <Skeleton count={3} />
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} height={24} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
} 