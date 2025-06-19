import { Card, CardContent } from "@/components/ui/card";

const qualities = [
  {
    title: "Efficient Workforce Management",
    description: "Track employee attendance and daily work hours with precision, ensuring accountability across all departments.",
  },
  {
    title: "Tailored for Healthcare Teams",
    description: "Designed specifically for the unique operational needs of the healthcare industry—simple, fast, and focused.",
  },
  {
    title: "Transparency & Trust",
    description: "Reinforce a culture of trust through clear tracking of hours and employee presence, without micromanagement.",
  },
  {
    title: "Work-Hour Compliance",
    description: "Automated checks ensure compliance with 8-hour/day and 40-hour/week work policies, helping both managers and employees stay aligned.",
  },
  {
    title: "Secure and Scalable",
    description: "Built on the modern MERN stack with security-first principles to scale confidently as your team grows.",
  },
];

const Features = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-purple-50 px-6 md:px-16 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
          Welcome to <span className="text-purple-600">Code 1st Healthcare</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Simplifying employee and attendance management for healthcare professionals with clarity, speed, and security.
        </p>
      </div>

      {/* Qualities Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {qualities.map((item, index) => (
          <Card
            key={index}
            className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-purple-700 mb-2">{item.title}</h2>
              <p className="text-sm text-slate-700">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-20">
        <a
          href="/signup"
          className="inline-block bg-purple-600 text-white text-lg font-medium px-8 py-3 rounded-lg hover:bg-purple-700 transition"
        >
          Get Started Today
        </a>
        <p className="text-sm text-slate-500 mt-2">Join the healthcare teams that trust Code 1st for employee management.</p>
      </div>
    </div>
  );
};

export default Features;
