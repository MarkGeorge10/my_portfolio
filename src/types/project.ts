export interface Project {
    id: number;
  title: string;
  description: string;
  image: string[];
  video: string;
  linksmodel: LinkModel[];
  headerIcon: string;

  }

  export interface LinkModel {
  icons: string;
  links: string;
}


export interface Category {
  id: number;
  name: string;
  projects: Project[];
}

export interface Position {
  x: number;
  y: number;
}

export interface NeuronProps {
  project?: Project;
  category?: Category;
  position: Position;
  isOutput?: boolean;
  onClick?: () => void;
}