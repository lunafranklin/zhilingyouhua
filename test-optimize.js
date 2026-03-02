
const https = require('https');
const http = require('http');

function testOptimize() {
  const postData = JSON.stringify({
    text: "帮我写一篇关于天气的文章",
    prompt: "请优化用户的指令，使其更加具体和明确。"
  });

  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/optimize',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  console.log('🚀 正在测试优化功能...');
  console.log('📤 请求数据:', postData);
  console.log('');

  const req = http.request(options, (res) =&gt; {
    let data = '';

    res.on('data', (chunk) =&gt; {
      data += chunk;
    });

    res.on('end', () =&gt; {
      console.log('📥 响应状态码:', res.statusCode);
      console.log('📥 响应数据:');
      try {
        const parsed = JSON.parse(data);
        console.log(JSON.stringify(parsed, null, 2));
        if (parsed.success) {
          console.log('');
          console.log('✅ 优化功能测试成功！');
          console.log('📝 优化结果:', parsed.result);
        } else {
          console.log('');
          console.log('❌ 优化功能测试失败！');
        }
      } catch (e) {
        console.log(data);
      }
    });
  });

  req.on('error', (e) =&gt; {
    console.error('❌ 请求出错:', e.message);
  });

  req.write(postData);
  req.end();
}

testOptimize();
