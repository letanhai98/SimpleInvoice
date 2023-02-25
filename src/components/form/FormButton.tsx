import { colors } from '@/utils';
import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { ViewStyle } from 'react-native';
import { PrimaryButton } from '../globals';

interface IProps {
  onPress: (data) => unknown;
  title: string;
  preventDirty?: boolean;
  preventValid?: boolean;
  disabled?: boolean;
  styleButtonContainer?: ViewStyle;
  shadow?: boolean;
}

export const FormButton: React.FC<IProps> = ({
  onPress,
  title,
  preventDirty = false,
  preventValid = false,
  styleButtonContainer,
  shadow = true,
}) => {
  const {
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
  } = useFormContext();

  const bgColor = useMemo(() => {
    let res = !isDirty || !isValid;

    if (preventDirty && preventValid) res = true;
    else if (preventDirty) res = !isValid;
    else if (preventValid) res = !isDirty;

    return res ? colors.bg_disable_btn : colors.primary;
  }, [isDirty, isValid, preventDirty, preventValid]);

  const disabledTouchableOpacity = useMemo(() => {
    let res = !isDirty || !isValid || isSubmitting;

    if (preventDirty && preventValid) res = isSubmitting;
    else if (preventDirty) res = !isValid || isSubmitting;
    else if (preventValid) res = !isDirty || isSubmitting;

    return res;
  }, [isDirty, isValid, isSubmitting, preventDirty, preventValid]);

  return (
    <PrimaryButton
      color={bgColor}
      disabled={disabledTouchableOpacity}
      loading={isSubmitting}
      onPress={handleSubmit(onPress)}
      title={title}
      containerStyle={[
        styleButtonContainer,
        shadow && {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
        },
      ]}
    />
  );
};
