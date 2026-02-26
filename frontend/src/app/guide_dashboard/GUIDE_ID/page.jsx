import Link from 'next/link';

{guides.map((guide) => (
  <Link key={guide._id} href={`/guide_dashboard/${guide._id}`}>
    <button>View Bookings</button>
  </Link>
))}