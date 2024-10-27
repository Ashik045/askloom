import { UserType } from "@/types.global";

interface UserT {
  user: UserType;
  setEditPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditPopup = ({ user, setEditPopUp }: UserT) => {
  console.log(user);

  return <div>EditPopup</div>;
};

export default EditPopup;
