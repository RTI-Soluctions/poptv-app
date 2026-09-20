import { Easing, LinearTransition, ReduceMotion } from 'react-native-reanimated';

// Keep the player and its scroll container moving together during rotation.
export const playerTransition = LinearTransition
  .duration(280)
  .easing(Easing.inOut(Easing.cubic))
  .reduceMotion(ReduceMotion.System);
