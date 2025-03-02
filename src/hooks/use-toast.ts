// "use client";

// // Inspired by react-hot-toast library
// import * as React from "react";

// import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

// const TOAST_LIMIT = 1;
// const TOAST_REMOVE_DELAY = 5000; // Reduced to 5 seconds for better UX

// type ToasterToast = ToastProps & {
//   id: string;
//   title?: React.ReactNode;
//   description?: React.ReactNode;
//   action?: ToastActionElement;
//   position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
//   autoClose?: number; // Time in ms to auto-close
//   hideProgressBar?: boolean;
//   closeOnClick?: boolean;
//   pauseOnHover?: boolean;
//   draggable?: boolean;
// };

// // Use string literals directly instead of actionTypes
// type ActionType = "ADD_TOAST" | "UPDATE_TOAST" | "DISMISS_TOAST" | "REMOVE_TOAST";

// type Action =
//   | {
//       type: "ADD_TOAST"; // Use string literal directly
//       toast: ToasterToast;
//     }
//   | {
//       type: "UPDATE_TOAST"; // Use string literal directly
//       toast: Partial<ToasterToast>;
//     }
//   | {
//       type: "DISMISS_TOAST"; // Use string literal directly
//       toastId?: ToasterToast["id"];
//     }
//   | {
//       type: "REMOVE_TOAST"; // Use string literal directly
//       toastId?: ToasterToast["id"];
//     };

// interface State {
//   toasts: ToasterToast[];
// }

// const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

// const addToRemoveQueue = (toastId: string) => {
//   if (toastTimeouts.has(toastId)) {
//     return;
//   }

//   const timeout = setTimeout(() => {
//     toastTimeouts.delete(toastId);
//     dispatch({
//       type: "REMOVE_TOAST",
//       toastId: toastId,
//     });
//   }, TOAST_REMOVE_DELAY);

//   toastTimeouts.set(toastId, timeout);
// };

// export const reducer = (state: State, action: Action): State => {
//   switch (action.type) {
//     case "ADD_TOAST":
//       return {
//         ...state,
//         toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
//       };

//     case "UPDATE_TOAST":
//       return {
//         ...state,
//         toasts: state.toasts.map((t) =>
//           t.id === action.toast.id ? { ...t, ...action.toast } : t
//         ),
//       };

//     case "DISMISS_TOAST": {
//       const { toastId } = action;

//       // ! Side effects ! - This could be extracted into a dismissToast() action,
//       // but I'll keep it here for simplicity
//       if (toastId) {
//         addToRemoveQueue(toastId);
//       } else {
//         state.toasts.forEach((toast) => {
//           addToRemoveQueue(toast.id);
//         });
//       }

//       return {
//         ...state,
//         toasts: state.toasts.map((t) =>
//           t.id === toastId || toastId === undefined
//             ? {
//                 ...t,
//                 open: false,
//               }
//             : t
//         ),
//       };
//     }
//     case "REMOVE_TOAST":
//       if (action.toastId === undefined) {
//         return {
//           ...state,
//           toasts: [],
//         };
//       }
//       return {
//         ...state,
//         toasts: state.toasts.filter((t) => t.id !== action.toastId),
//       };
//   }
// };

// const listeners: Array<(state: State) => void> = [];

// let memoryState: State = { toasts: [] };

// function dispatch(action: Action) {
//   memoryState = reducer(memoryState, action);
//   listeners.forEach((listener) => {
//     listener(memoryState);
//   });
// }

// type Toast = Omit<ToasterToast, "id">;

// function toast({
//   position = "top-right",
//   autoClose = 5000,
//   hideProgressBar = false,
//   closeOnClick = true,
//   pauseOnHover = true,
//   draggable = true,
//   ...props
// }: Toast) {
//   const id = genId();

//   const update = (props: ToasterToast) =>
//     dispatch({
//       type: "UPDATE_TOAST",
//       toast: { ...props, id },
//     });
//   const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

//   dispatch({
//     type: "ADD_TOAST",
//     toast: {
//       ...props,
//       id,
//       open: true,
//       onOpenChange: (open) => {
//         if (!open) dismiss();
//       },
//       position,
//       autoClose,
//       hideProgressBar,
//       closeOnClick,
//       pauseOnHover,
//       draggable,
//     },
//   });

//   if (autoClose) {
//     const timeout = setTimeout(() => {
//       dismiss();
//     }, autoClose);
//     toastTimeouts.set(id, timeout);
//   }

//   return {
//     id: id,
//     dismiss,
//     update,
//   };
// }

// function useToast() {
//   const [state, setState] = React.useState<State>(memoryState);

//   React.useEffect(() => {
//     listeners.push(setState);
//     return () => {
//       const index = listeners.indexOf(setState);
//       if (index > -1) {
//         listeners.splice(index, 1);
//       }
//     };
//   }, [state]);

//   return {
//     ...state,
//     toast,
//     dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
//   };
// }

// export { useToast, toast };

// function genId() {
//     throw new Error("Function not implemented.");
// }
