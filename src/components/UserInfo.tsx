import type { User } from "../types/user";

interface Props {
  user: User | null;
}

const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) return <p>Loading user...</p>;

  return (
    <div className="card">
      <p><strong>Full Name:</strong> {user.fullName}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default UserInfo;
