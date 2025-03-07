import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./reportsnav.module.css";

interface NavLinkProps {
  val: string;
  basePath: string;
  isActive?: boolean;
}

function NavLink({ val, basePath, isActive }: NavLinkProps) {
  const router = useRouter();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Use shallow routing to avoid unnecessary data fetching
    router.push(`${basePath}/${val}`, undefined, { shallow: true });
  };
  
  return (
    <a 
      href={`${basePath}/${val}`} 
      className={`${styles.anchor} ${isActive ? styles.active : ''}`}
      onClick={handleClick}
    >
      {val}
    </a>
  );
}

interface ChartNavProps {
  items: string[];
  basePath: string;
  currentItem?: string;
}

export default function ChartNav({ items, basePath, currentItem }: ChartNavProps) {
  const router = useRouter();
  // Use the prop if provided, otherwise extract from the URL
  const activeItem = currentItem || router.query.id as string;
  
  return (
    <div className={styles.mainav}>
      <div className={styles.navbar}>
        {items.map((item) => (
          <NavLink 
            key={item} 
            val={item} 
            basePath={basePath}
            isActive={item === activeItem}
          />
        ))}
        <Link href="/reportslanding" className={styles.anchor}>Menu</Link>
      </div>
    </div>
  );
} 