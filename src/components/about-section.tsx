"use client";

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-12 bg-gray-900 min-h-[calc(100vh-6rem)] flex items-center justify-center"
    >
      <div className="container px-4 md:px-6 w-full max-w-5xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center w-full">
          <div className="space-y-2 w-full">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              About Me
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl text-white">
              Passionate about building intelligent systems and solving complex problems
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 w-full">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Background</h3>
              <p className="text-muted-foreground text-white">
                I&apos;m currently working as an AI Research Assistant at Pennsylvania State University while pursuing my Master&apos;s Degree in Artificial Intelligence. My research focuses on developing intelligent systems that can understand and process complex data.
              </p>
              <p className="text-muted-foreground text-white">
                With a strong foundation in software engineering and a passion for AI, I&apos;m constantly exploring new technologies and methodologies to create innovative solutions that make a difference.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Current Focus</h3>
              <ul className="space-y-2 text-muted-foreground text-white">
                <li>🔭 Working as an AI Research Assistant at Pennsylvania State University</li>
                <li>🎓 Pursuing a Master&apos;s Degree in Artificial Intelligence</li>
                <li>🌱 Enhancing my skills in Algorithms and Programming Automatic Calculus</li>
                <li>💬 Specializing in Machine Learning, Android Development, and Flutter Development</li>
                <li>📫 Available at mark.fahim50@gmail.com for collaborations and opportunities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}