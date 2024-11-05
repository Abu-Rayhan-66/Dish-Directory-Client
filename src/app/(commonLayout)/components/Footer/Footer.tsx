import Link from "next/link";



const Footer = () => {
    return (
        <footer className="footer bg-gradient-to-tr from-[#083f53] to-[#1c9991] text-neutral-content p-10">
  <nav>
    <h6 className="footer-title">Services</h6>
    <Link className="link link-hover" href="/about">Team Section</Link>
   <Link className="link link-hover" href="/about">Voucher</Link>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
   <Link className="link link-hover" href="/about">About us</Link>
    <Link className="link link-hover" href="/contact">Contact</Link>
   <Link className="link link-hover" href="/contact">Message Us</Link>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <h2 className="link link-hover">Terms of use</h2>
    <h2 className="link link-hover">Privacy policy</h2>
    <h2 className="link link-hover">Cookie policy</h2>
  </nav>
</footer>
    );
};

export default Footer;