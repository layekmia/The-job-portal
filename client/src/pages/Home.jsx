import AppDownLoad from "../components/AppDownLoad";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import JobListing from "../components/JobListing";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div>
      <NavBar/>
      <Hero/>
      <JobListing/>
      <AppDownLoad/>
      <Footer/>
    </div>
  );
}