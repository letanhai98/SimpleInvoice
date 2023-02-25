import { userApi } from '@/apis';
import { getMe } from '@/slices';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';

const useFetchAccessToken = () => {
  const { loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const fecthToken = async () => {
    try {
      const data = {
        client_id: 'oO8BMTesSg9Vl3_jAyKpbOd2fIEa',
        client_secret: '0Exp4dwqmpON_ezyhfm0o_Xkowka',
        grant_type: 'password',
        scope: ' openid',
        username: 'dung+octopus4@101digital.io',
        password: 'Abc@123456',
      };
      const res = await userApi.fetchToken(data);

      dispatch(getMe(res?.access_token));
    } catch (error) {
      console.log('🚀 fecthToken ~ error', error);
    }
  };

  return { fecthToken, loading };
};

export default useFetchAccessToken;
