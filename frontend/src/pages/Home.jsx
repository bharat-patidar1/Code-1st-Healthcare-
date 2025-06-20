import { Button } from '../components/ui/button';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Welcome to Code 1st Healthcare
        </h1>
        <p className="text-lg md:text-xl max-w-xl text-muted-foreground mb-6">
          Empowering healthcare workforce with digital attendance tracking, streamlined communication, and secure employee management.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <a href="/login">Get Started</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/signup">Join Us</a>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
