import Link from "next/link";

export default function Loadmore() {
  return (
    <div className="text-center mt-2">
      <Link href="/shop" passHref>
        <a className="btn btn-outline-accent">
          More products<i className="ci-arrow-right ms-1"></i>
        </a>
      </Link>
    </div>
  );
}
