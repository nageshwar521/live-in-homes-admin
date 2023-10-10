export interface RowDetailsInterface {
  nodeItem?: any;
  colDef?: any;
  formData: any;
}

export interface BranchDetailsProps {
  mode?: "view" | "edit" | "create";
  onClose?: () => void;
  rowDetails: RowDetailsInterface | null;
  onSubmit: (data: any) => void;
}

export interface AmenityDetailsProps {
  mode?: "view" | "edit" | "create";
  onClose?: () => void;
  rowDetails: RowDetailsInterface | null;
  onSubmit: (data: any) => void;
}

export interface CategoryDetailsProps {
  mode?: "view" | "edit" | "create";
  onClose?: () => void;
  rowDetails: RowDetailsInterface | null;
  onSubmit: (data: any) => void;
}

export interface ConditionDetailsProps {
  mode?: "view" | "edit" | "create";
  onClose?: () => void;
  rowDetails: RowDetailsInterface | null;
  onSubmit: (data: any) => void;
}

export interface PostDetailsProps {
  mode?: "view" | "edit" | "create";
  onClose?: () => void;
  rowDetails: RowDetailsInterface | null;
  onSubmit: (data: any) => void;
}

export interface UserDetailsProps {
  mode?: "view" | "edit" | "create";
  onClose?: () => void;
  rowDetails: RowDetailsInterface | null;
  onSubmit: (data: any) => void;
}
