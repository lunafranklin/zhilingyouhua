/**
 * 新手引导弹窗组件
 * 首次使用时显示，帮助用户快速上手
 */
export default function GuideModal({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 遮罩层 */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* 弹窗内容 */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 mx-4">
        {/* 标题 */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">👋</div>
          <h2 className="text-2xl font-bold text-gray-800">
            欢迎使用指令优化工具！
          </h2>
        </div>

        {/* 使用说明 */}
        <div className="space-y-4 mb-6">
          <p className="text-gray-600 text-center">
            只需 3 步就能优化你的指令：
          </p>

          <div className="bg-blue-50 rounded-xl p-4 space-y-3">
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              <p className="text-gray-700">
                在上方输入框粘贴或输入你的内容
                <br />
                <span className="text-sm text-gray-500">
                  （比如语音输入的文字、你想说的话）
                </span>
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                2
              </span>
              <p className="text-gray-700">
                选择一个优化规则
                <br />
                <span className="text-sm text-gray-500">
                  （已经默认选好了，你也可以去规则商店挑选更多）
                </span>
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                3
              </span>
              <p className="text-gray-700">
                点击「开始优化」按钮
                <br />
                <span className="text-sm text-gray-500">
                  （优化后的结果会显示在下方）
                </span>
              </p>
            </div>
          </div>

          <p className="text-center text-gray-500">
            就这么简单！试试看吧~
          </p>
        </div>

        {/* 按钮 */}
        <button
          onClick={onClose}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition-colors"
        >
          🚀 我知道了，开始使用
        </button>
      </div>
    </div>
  );
}
