import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * 滚动显示动画组件
 * 当元素进入视口时触发动画效果
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - 子元素
 * @param {string} props.animation - 动画类型：fade-up, fade-down, fade-left, fade-right, scale-in
 * @param {number} props.delay - 延迟时间（毫秒）
 * @param {number} props.duration - 动画时长（毫秒）
 * @param {string} props.className - 额外的 class
 * @param {Object} props.style - 额外的样式
 */
export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  className = '',
  style = {}
}) {
  const { isVisible, elementRef } = useScrollAnimation();

  // 构建动画样式
  const baseStyle = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(animation, isVisible),
    transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
    ...style
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={baseStyle}
    >
      {children}
    </div>
  );
}

/**
 * 根据动画类型获取初始 transform 值
 */
function getTransform(animation, isVisible) {
  if (isVisible) {
    return 'translate(0, 0) scale(1)';
  }

  switch (animation) {
    case 'fade-up':
      return 'translate(0, 40px) scale(1)';
    case 'fade-down':
      return 'translate(0, -40px) scale(1)';
    case 'fade-left':
      return 'translate(40px, 0) scale(1)';
    case 'fade-right':
      return 'translate(-40px, 0) scale(1)';
    case 'scale-in':
      return 'translate(0, 0) scale(0.9)';
    case 'fade':
      return 'translate(0, 0) scale(1)';
    default:
      return 'translate(0, 0) scale(1)';
  }
}

/**
 * 便捷组件：上滑淡入
 */
export function FadeUp({ children, delay = 0, duration = 600, className = '', style = {} }) {
  return (
    <ScrollReveal
      animation="fade-up"
      delay={delay}
      duration={duration}
      className={className}
      style={style}
    >
      {children}
    </ScrollReveal>
  );
}

/**
 * 便捷组件：下滑淡入
 */
export function FadeDown({ children, delay = 0, duration = 600, className = '', style = {} }) {
  return (
    <ScrollReveal
      animation="fade-down"
      delay={delay}
      duration={duration}
      className={className}
      style={style}
    >
      {children}
    </ScrollReveal>
  );
}

/**
 * 便捷组件：左滑淡入
 */
export function FadeLeft({ children, delay = 0, duration = 600, className = '', style = {} }) {
  return (
    <ScrollReveal
      animation="fade-left"
      delay={delay}
      duration={duration}
      className={className}
      style={style}
    >
      {children}
    </ScrollReveal>
  );
}

/**
 * 便捷组件：右滑淡入
 */
export function FadeRight({ children, delay = 0, duration = 600, className = '', style = {} }) {
  return (
    <ScrollReveal
      animation="fade-right"
      delay={delay}
      duration={duration}
      className={className}
      style={style}
    >
      {children}
    </ScrollReveal>
  );
}

/**
 * 便捷组件：缩放淡入
 */
export function ScaleIn({ children, delay = 0, duration = 600, className = '', style = {} }) {
  return (
    <ScrollReveal
      animation="scale-in"
      delay={delay}
      duration={duration}
      className={className}
      style={style}
    >
      {children}
    </ScrollReveal>
  );
}

/**
 * 便捷组件：简单淡入
 */
export function Fade({ children, delay = 0, duration = 600, className = '', style = {} }) {
  return (
    <ScrollReveal
      animation="fade"
      delay={delay}
      duration={duration}
      className={className}
      style={style}
    >
      {children}
    </ScrollReveal>
  );
}
