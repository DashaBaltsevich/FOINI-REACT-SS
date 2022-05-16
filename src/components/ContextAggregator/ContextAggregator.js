import { NotificationsContextWrapper } from '../../contexts';
import {
  UsersContextWrapper,
  AuthenticationContextWrapper,
} from '../../contexts';

export const ContextAggregator = ({ children }) => {
  return (
    <NotificationsContextWrapper>
      <AuthenticationContextWrapper>
        <UsersContextWrapper>{children}</UsersContextWrapper>
      </AuthenticationContextWrapper>
    </NotificationsContextWrapper>
  );
};
