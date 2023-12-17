import { User } from './user.model';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User("user","name","surname","pwd","email",696969696)).toBeTruthy();
  });
});
