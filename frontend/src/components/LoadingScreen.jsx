import { ThreeDots } from "react-loader-spinner";

function LoadingScreen({ loadingStep }) {
  return (
    <div className="loading-screen">
      <div className="loading-card">
        <h1>🤖 AI Resume Analyzer</h1>

        <ThreeDots
          visible={true}
          height="60"
          width="80"
          color="#4F46E5"
        />

        <h2>Analyzing your resume...</h2>

        <div className="loading-steps">
          <p className={loadingStep >= 1 ? "active-step" : ""}>
            📄 Extracting Resume...
          </p>

          <p className={loadingStep >= 2 ? "active-step" : ""}>
            📋 Reading Job Description...
          </p>

          <p className={loadingStep >= 3 ? "active-step" : ""}>
            🧠 Matching Skills...
          </p>

          <p className={loadingStep >= 4 ? "active-step" : ""}>
            📊 Calculating ATS Score...
          </p>

          <p className={loadingStep >= 5 ? "active-step" : ""}>
            ✨ Generating Suggestions...
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;