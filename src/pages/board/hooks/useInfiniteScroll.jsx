
import { useEffect, useRef, useCallback } from 'react';

const useInfiniteScroll = (callback, hasMore, loading, enabled = true) => {
  const observer = useRef();
  
  const lastElementRef = useCallback(node => {
    if (loading || !enabled) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && enabled) {
        callback();
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, callback, enabled]);

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return { lastElementRef };
};

export default useInfiniteScroll;