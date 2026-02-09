import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FadeUp, FadeLeft, FadeRight, ScaleIn, Fade } from '../components/ScrollReveal';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '../components/Toast';
import {
  LightningIcon,
  EditIcon,
  ToolIcon,
  DocumentIcon,
  TargetIcon,
  FreeIcon,
  LockIcon,
  GlobeIcon,
  SearchIcon,
  RocketIcon,
  SaveIcon,
  IdeaIcon,
  WaveIcon
} from '../components/Icons';
import {
  SkeletonHero,
  SkeletonFeatures,
  SkeletonDemo,
  SkeletonRules,
  SkeletonTechFeatures,
  SkeletonCTA
} from '../components/Skeleton';

/**
 * 品牌首页
 * 展示产品品牌形象，包含Hero、功能介绍、使用演示等内容
 */
export default function Landing({ isMobile = true }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  // 模拟页面加载
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // 点击功能按钮时检查登录状态
  const handleNavigate = (path, message) => {
    if (!isAuthenticated) {
      toast.info(message || '请先登录后再使用');
      navigate('/login?redirect=' + encodeURIComponent(path));
    } else {
      navigate(path);
    }
  };

  const features = [
    {
      icon: LightningIcon,
      iconProps: { size: 28, className: 'text-blue-500' },
      title: '快速优化',
      description: '输入内容后选择规则，一键生成高质量优化结果',
      color: 'blue',
      action: '/tool'
    },
    {
      icon: EditIcon,
      iconProps: { size: 28, className: 'text-purple-500' },
      title: '规则商店',
      description: '提供多种预置规则，也可以创建专属优化规则',
      color: 'purple',
      action: '/store'
    },
    {
      icon: ToolIcon,
      iconProps: { size: 28, className: 'text-green-500' },
      title: '自定义规则',
      description: '根据你的需求创建个性化规则，满足特殊场景',
      color: 'green',
      action: '/create'
    }
  ];

  const popularRules = [
    { name: '错别字纠正', desc: '修正错别字，删除语气词', icon: DocumentIcon, iconProps: { size: 24 } },
    { name: '简洁优化', desc: '删除冗余，保留核心', icon: ToolIcon, iconProps: { size: 24 } },
    { name: '正式化表达', desc: '转换为正式书面语', icon: EditIcon, iconProps: { size: 24 } },
    { name: '口语转文案', desc: '口语转专业文案', icon: TargetIcon, iconProps: { size: 24 } }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert('感谢关注！我们会第一时间通知你。');
      setEmail('');
    }
  };

  // 加载中显示骨架屏
  if (loading) {
    return (
      <div className="pb-0">
        <SkeletonHero />
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <SkeletonFeatures />
          </div>
        </section>
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-5xl mx-auto px-4">
            <SkeletonDemo />
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <SkeletonRules />
          </div>
        </section>
        <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <SkeletonTechFeatures />
          </div>
        </section>
        <SkeletonCTA />
      </div>
    );
  }

  // PC端布局
  if (!isMobile) {
    return (
      <div className="pb-0">
        {/* Hero区域 */}
        <section className="relative py-20 overflow-hidden">
          {/* 背景渐变 */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent"></div>
          
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <FadeUp duration={800}>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <IdeaIcon size={18} />
                <span>AI 大模型驱动</span>
              </div>
            </FadeUp>
            
            <FadeUp duration={800} delay={100}>
              <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
                让AI指令
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">更精准</span>
                · 更高效
              </h1>
            </FadeUp>
            
            <FadeUp duration={800} delay={200}>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                输入你的内容，选择优化规则，一键生成高质量结果。免费使用，隐私安全。
              </p>
            </FadeUp>
            
            <FadeUp duration={600} delay={400}>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => handleNavigate('/tool', '请先登录后开始优化')}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-medium text-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
                >
                  <RocketIcon size={24} />
                  <span>免费开始使用</span>
                </button>
                <button
                  onClick={() => handleNavigate('/store', '请先登录后查看规则')}
                  className="bg-white text-gray-700 px-8 py-4 rounded-xl font-medium text-lg border-2 border-gray-200 hover:border-gray-300 transition-all flex items-center gap-2"
                >
                  <SearchIcon size={24} />
                  <span>查看规则商店</span>
                </button>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* 核心功能 */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <FadeUp>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">核心功能</h2>
                <p className="text-gray-600">简单三步，完成指令优化</p>
              </div>
            </FadeUp>
            
            <div className="grid grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <FadeUp key={index} duration={600} delay={200 + index * 100}>
                  <div
                    onClick={() => handleNavigate(feature.action, `请先登录后使用${feature.title}`)}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group"
                  >
                    <div className={`w-14 h-14 ${feature.color === 'blue' ? 'bg-blue-50' : feature.color === 'purple' ? 'bg-purple-50' : 'bg-green-50'} rounded-2xl flex items-center justify-center mb-4`}>
                      <feature.icon {...feature.iconProps} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                      {feature.title}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                        →
                      </span>
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* 使用演示 */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-5xl mx-auto px-4">
            <FadeUp>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">使用演示</h2>
                <p className="text-gray-600">对比优化前后的效果</p>
              </div>
            </FadeUp>
            
            <div className="grid grid-cols-2 gap-8">
              {/* 优化前 */}
              <FadeLeft duration={600} delay={200}>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <DocumentIcon size={24} className="text-gray-500" />
                    <h3 className="text-lg font-bold text-gray-800">优化前</h3>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 min-h-40">
                    <p className="text-gray-600 whitespace-pre-wrap">
"帮我写个邮件 这个那个嗯 就是想问问客户 他们那个项目 做的怎么样了呀 什么时候能完成"
                    </p>
                  </div>
                </div>
              </FadeLeft>
              
              {/* 优化后 */}
              <FadeRight duration={600} delay={400}>
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200">
                  <div className="flex items-center gap-2 mb-4">
                    <WaveIcon size={24} className="text-green-500" />
                    <h3 className="text-lg font-bold text-green-700">优化后</h3>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4 min-h-40">
                    <p className="text-gray-800 whitespace-pre-wrap font-medium">
"尊敬的客户，您好！

感谢您一直以来的支持与信任。关于贵司项目，我想了解一下目前的进展情况如何？预计什么时候可以完成？

如方便的话，烦请回复告知，谢谢！

此致
敬礼"
                    </p>
                  </div>
                </div>
              </FadeRight>
            </div>
            
            <FadeUp duration={600} delay={600}>
              <div className="text-center mt-8">
                <button
                  onClick={() => handleNavigate('/tool', '请先登录后体验')}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <span>立即体验</span>
                  <span>→</span>
                </button>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* 技术特点 */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <FadeUp duration={600}>
              <h2 className="text-3xl font-bold mb-8">技术特点</h2>
            </FadeUp>
            
            <div className="grid grid-cols-4 gap-6">
              {[
                { icon: FreeIcon, iconProps: { size: 36, className: 'text-green-400' }, title: '完全免费', desc: '每日10次免费使用' },
                { icon: LockIcon, iconProps: { size: 36, className: 'text-blue-300' }, title: '隐私安全', desc: '数据本地存储' },
                { icon: GlobeIcon, iconProps: { size: 36, className: 'text-blue-300' }, title: '完全开源', desc: '代码公开透明' },
                { icon: LightningIcon, iconProps: { size: 36, className: 'text-yellow-300' }, title: '快速响应', desc: '基于大模型能力' }
              ].map((item, index) => (
                <FadeUp key={index} duration={500} delay={200 + index * 100}>
                  <div className="text-center">
                    <div className="mb-3 flex justify-center">
                      <item.icon {...item.iconProps} />
                    </div>
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className="text-blue-200 text-sm">{item.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* CTA区域 */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <FadeUp duration={600}>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">开始使用</h2>
              <p className="text-gray-600 mb-8">
                输入你的内容，选择优化规则，立即获得高质量优化结果
              </p>
              <button
                onClick={() => handleNavigate('/tool', '请先登录后开始优化')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-medium text-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <RocketIcon size={24} />
                <span>立即开始优化</span>
              </button>
            </FadeUp>
          </div>
        </section>

        {/* 底部 */}
        <footer className="bg-gray-800 text-gray-400 py-8">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LightningIcon size={20} className="text-blue-400" />
                <span className="font-bold text-white">智能指令优化</span>
              </div>
              <div className="text-sm">
                SmartTuneAI · 每日10次使用
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // 移动端布局（简化版动画）
  return (
    <div className="pb-20">
      {/* Hero区域 */}
      <section className="py-12 px-4 text-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <FadeUp duration={600}>
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium mb-4">
            <IdeaIcon size={14} />
            <span>AI 大模型驱动</span>
          </div>
        </FadeUp>
        
        <FadeUp duration={600} delay={100}>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            让AI指令
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">更精准</span>
            · 更高效
          </h1>
        </FadeUp>
        
        <FadeUp duration={600} delay={200}>
          <p className="text-gray-600 mb-6 text-sm">
            输入你的内容，选择优化规则，一键生成高质量结果
          </p>
        </FadeUp>
        
        <FadeUp duration={500} delay={300}>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleNavigate('/tool', '请先登录后开始优化')}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-medium text-center flex items-center justify-center gap-2"
            >
              <RocketIcon size={20} />
              <span>免费开始使用</span>
            </button>
            <button
              onClick={() => handleNavigate('/store', '请先登录后查看规则')}
              className="bg-white text-gray-700 px-6 py-3 rounded-xl font-medium text-center border-2 border-gray-200 flex items-center justify-center gap-2"
            >
              <SearchIcon size={20} />
              <span>查看规则商店</span>
            </button>
          </div>
        </FadeUp>
      </section>

      {/* 核心功能 */}
      <section className="py-8 px-4">
        <FadeUp>
          <h2 className="text-xl font-bold text-gray-800 mb-4">核心功能</h2>
        </FadeUp>
        
        <div className="space-y-3">
          {features.map((feature, index) => (
            <FadeUp key={index} duration={500} delay={index * 100}>
              <div
                className="bg-white rounded-xl p-4 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${feature.color === 'blue' ? 'bg-blue-50' : feature.color === 'purple' ? 'bg-purple-50' : 'bg-green-50'} rounded-xl flex items-center justify-center`}>
                    <feature.icon {...feature.iconProps} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{feature.title}</h3>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* 使用演示 */}
      <section className="py-8 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <FadeUp>
          <h2 className="text-xl font-bold text-gray-800 mb-4">使用演示</h2>
        </FadeUp>
        
        <FadeLeft duration={500} delay={100}>
          <div className="bg-white rounded-xl p-4 shadow-md mb-4">
            <div className="flex items-center gap-2 mb-2">
              <DocumentIcon size={20} className="text-gray-500" />
              <h3 className="font-bold text-gray-700">优化前</h3>
            </div>
            <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
"帮我写个邮件 这个那个嗯 就是想问问客户 他们那个项目 做的怎么样了呀"
            </p>
          </div>
        </FadeLeft>
        
        <FadeRight duration={500} delay={200}>
          <div className="bg-white rounded-xl p-4 shadow-md border-2 border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <WaveIcon size={20} className="text-green-500" />
              <h3 className="font-bold text-green-700">优化后</h3>
            </div>
            <p className="text-sm text-gray-800 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-3">
"尊敬的客户，您好！

感谢您一直以来的支持。关于贵司项目的进展情况，能否告知一下？

此致
敬礼"
            </p>
          </div>
        </FadeRight>
      </section>

      {/* 技术特点 */}
      <section className="py-8 px-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <FadeUp duration={500}>
          <h2 className="text-xl font-bold text-center mb-4">技术特点</h2>
        </FadeUp>
        
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: FreeIcon, iconProps: { size: 28 }, title: '完全免费', desc: '每日10次' },
            { icon: LockIcon, iconProps: { size: 28 }, title: '隐私安全', desc: '本地存储' },
            { icon: GlobeIcon, iconProps: { size: 28 }, title: '完全开源', desc: '代码公开' },
            { icon: LightningIcon, iconProps: { size: 28 }, title: '快速响应', desc: '大模型能力' }
          ].map((item, index) => (
            <FadeUp key={index} duration={400} delay={100 + index * 80}>
              <div className="text-center">
                <div className="flex justify-center mb-1">
                  <item.icon {...item.iconProps} />
                </div>
                <h4 className="font-bold text-sm">{item.title}</h4>
                <p className="text-xs text-blue-200">{item.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* 底部 */}
      <footer className="py-6 bg-gray-800 text-gray-400 text-center text-sm">
        <p>智能指令优化 · 每日10次使用</p>
      </footer>
    </div>
  );
}
