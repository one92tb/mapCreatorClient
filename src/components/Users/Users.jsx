import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUsers } from '../../actions/user/fetchUsers';
import { changePermissions } from '../../actions/user/changePermissions';
import { deleteAccount } from '../../actions/user/deleteAccount';

import {
  Wrapper,
  Select,
  Input,
  Form,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  RemoveIcon,
  Option
} from './style';

Wrapper.displayName = 'div';
Select.displayName = 'select';
Input.displayName = 'input';
Form.displayName = 'form';
TableContainer.displayName = 'div';
Table.displayName = 'table';
Thead.displayName = 'thead';
Tbody.displayName = 'tbody';
Tr.displayName = 'tr';
Th.displayName = 'th';
Td.displayName = 'td';
RemoveIcon.displayName = 'img';
Option.displayName = 'option';

export class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: ''
    };
  }

  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers();
  }

  handleChangeUser = (e) => {
    this.setState({ login: e.target.value });
  };

  handleChangeStatus = (e, user) => {
    const { changePermissions } = this.props;
    const status = e.target.value === 'Admin';
    changePermissions(status, user.id);
  };

  removeUser = (id) => {
    const { deleteAccount } = this.props;
    deleteAccount(id);
  };

  render() {
    const { login } = this.state;
    const { users } = this.props;
    return (
      <Wrapper>
        <Form>
          <Input onChange={(e) => this.handleChangeUser(e)} type='text' name='user' placeholder='search user' />
        </Form>
        <TableContainer>
          <Table>
            <Thead>
              <tr>
                <Th>id</Th>
                <Th>name</Th>
                <Th>change status</Th>
                <Th>remove</Th>
              </tr>
            </Thead>
            <Tbody>
              {
                users.filter((user) => user.login.search(login) !== -1 && user).map((user, id) => (
                  <Tr key={user.id} data-testid='user'>
                    <Td>{id + 1}</Td>
                    <Td>{user.login}</Td>
                    <Td>
                      {
                      user.id === 1
                        ? ('Admin')
                        : (
                          <Select data-testid='select' name='user' onChange={(e) => this.handleChangeStatus(e, user)}>
                            <Option key={user.login}>
                              {
                              user.isAdmin
                                ? 'Admin'
                                : 'User'
                            }
                            </Option>
                            <Option key={user.login + 1}>
                              {
                              user.isAdmin
                                ? 'User'
                                : 'Admin'
                              }
                            </Option>
                          </Select>
                        )
                    }
                    </Td>
                    <Td>
                      {user.id !== 1 && (
                        <RemoveIcon
                          data-testid='removeBtn'
                          onClick={() => this.removeUser(user.id)}
                          src='img/delete.png'
                        />
                      )}
                    </Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </TableContainer>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = {
  fetchUsers,
  changePermissions,
  deleteAccount
};

const mapStateToProps = (state) => ({ users: state.user.users });

export default connect(mapStateToProps, mapDispatchToProps)(Users);

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    login: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired
  })).isRequired,
  fetchUsers: PropTypes.func.isRequired,
  changePermissions: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired
};
