import { useSelector, useDispatch } from "react-redux";
import { saveUser } from "../reducers/loginReducer";
import { Link } from "react-router-dom";

const UserList = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const users = state.users;

  return (
    <div>
      <h2>Users</h2>
      <table id="user-list">
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr>
              <td>
                <Link to={"/users/" + user.id}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
