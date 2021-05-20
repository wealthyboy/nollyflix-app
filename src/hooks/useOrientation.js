import { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
export default useOrientation = () => {
  const porTrait = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  };
  useEffect(() => {
    porTrait();
  }, []);
};
