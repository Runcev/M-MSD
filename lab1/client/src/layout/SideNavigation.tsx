import { Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { Lab, LABS } from "../constants";
import { useCallback } from "react"

import styles from './SideNavigation.module.css';

type MenuItem = Required<MenuProps>['items'][number];

export const SideNavigation = () => {
  const navigate = useNavigate();

  const getMenuItem = useCallback(({ id, title, url }: Lab): MenuItem => ({
    key: `item-${id}`,
    label: `Lab ${id}: ${title}`,
    onClick: () => navigate(url)
  }), [navigate]);

  const items: MenuItem[] = Object.values(LABS).map(getMenuItem);

  return (
      <Menu className={styles.sideNavigation} items={items} theme={"dark"} />
  );
};
