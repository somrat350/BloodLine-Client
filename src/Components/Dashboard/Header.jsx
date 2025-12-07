import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";

const Header = () => {
  const { user, userLoading } = useAuth();
  const { role, isLoading } = useRole();
  if (userLoading || isLoading) return;
  return (
    <div className="pr-5 flex justify-end items-center gap-3 w-full">
      <img src={user?.photoURL} className="w-10 h-10 rounded-full" />
      <div className="flex flex-col">
        <h2 className="font-semibold text-base">{user?.displayName}</h2>
        <span className="text-sm text-gray-600">{role}</span>
      </div>
    </div>
  );
};

export default Header;
