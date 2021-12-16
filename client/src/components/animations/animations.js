export const animationParentContainer = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

export const animationChildContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const animationChildContainerProfile = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};
