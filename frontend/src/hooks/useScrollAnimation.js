import { useState, useEffect, useRef } from 'react';

/**
 * 滚动动画 Hook
 * 使用 Intersection Observer 检测元素是否进入视口
 * 
 * @param {Object} options - 配置选项
 * @param {number} options.threshold - 触发阈值 (0-1)，默认 0.1
 * @param {boolean} options.once - 是否只触发一次，默认 true
 * @param {string} options.rootMargin - 视口边距，默认 '-50px'
 * @returns {Object} { isVisible, elementRef }
 */
export function useScrollAnimation(options = {}) {
  const {
    threshold = 0.1,
    once = true,
    rootMargin = '-50px'
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else {
          if (!once) {
            setIsVisible(false);
          }
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, once, rootMargin]);

  return { isVisible, elementRef };
}

/**
 * 便捷函数：创建带延迟的动画状态
 * 用于让多个元素依次动画
 * 
 * @param {number} delay - 延迟毫秒数
 * @returns {Object} { isVisible, elementRef }
 */
export function useStaggeredAnimation(delay = 100) {
  return useScrollAnimation({
    threshold: 0.1,
    once: true,
    rootMargin: '-50px'
  });
}
