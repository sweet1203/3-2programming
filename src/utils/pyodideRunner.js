let pyodideInstance = null;

export const loadPyodideEngine = async () => {
  if (pyodideInstance) return pyodideInstance;
  
  if (!window.loadPyodide) {
    // Load Pyodide script dynamically if not present
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js';
    document.head.appendChild(script);
    
    await new Promise((resolve) => {
      script.onload = resolve;
    });
  }

  pyodideInstance = await window.loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/',
  });
  
  return pyodideInstance;
};

export const executePythonCode = async (code) => {
  try {
    const pyodide = await loadPyodideEngine();
    
    // Redirect stdout to capture prints
    pyodide.runPython(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);

    await pyodide.runPythonAsync(code);
    
    const stdout = pyodide.runPython("sys.stdout.getvalue()");
    const stderr = pyodide.runPython("sys.stderr.getvalue()");
    
    return { success: true, output: stdout + stderr };
  } catch (error) {
    return { success: false, error: parsePythonError(error.message) };
  }
};

// 학생 친화적 에러 메시지로 변환하는 로직
const parsePythonError = (errorMessage) => {
  if (errorMessage.includes("SyntaxError")) {
    return "💡 [문법 오류] 파이썬 문법에 어긋나는 부분이 있어요. 괄호, 콜론(:), 따옴표 등이 빠지지 않았는지 확인해보세요!";
  }
  if (errorMessage.includes("IndentationError")) {
    return "💡 [들여쓰기 오류] 파이썬에서는 들여쓰기가 매우 중요해요! 반복문이나 조건문 내부는 스페이스바 4칸을 꼭 띄워주세요.";
  }
  if (errorMessage.includes("NameError")) {
    return "💡 [이름 오류] 정의되지 않은 변수나 함수를 사용했어요. 오타가 없는지 확인해보세요.";
  }
  // 기본 에러 메시지도 함께 반환
  return "💡 [실행 오류] 코드를 실행하다가 문제가 발생했어요:\n\n" + errorMessage;
};
