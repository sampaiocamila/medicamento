
export interface Config {
  menuItems: MenuItem[];
}

export interface MenuItem {
  id: string;
  label: string;
  content: string;
  content_img: boolean;
  icon_color: string;
  description_service: string;
  objective: string;
  link: string;
  sub: MenuItem[];
  name_breadcrumb: string;
}

export interface NameLink {
  link: string;
  name: string;
}
