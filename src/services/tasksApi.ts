import { ITask } from "../components/interfaces";
import { firebase } from "../lib/firebase";

const collection = firebase.firestore().collection("tasks");

const putData = (data: ITask) => {
  return new Promise((resolve, reject) => {
    collection
      .doc(data.id.toString())
      .set(data)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(false);
      });
  });
};

const getData = async () => {
  console.log("oryginal ");
  return new Promise((resolve, reject) => {
    collection
      .get()
      .then((data) => {
        const tasksCollection = data.docs.map((item) => {
          const task = item.data();
          return { ...task };
        });
        resolve(tasksCollection);
      })
      .catch((err) => reject(false));
  });
};

const updateByKeyName = (id: number, key: string, value: string) => {
  return new Promise((resolve, reject) => {
    collection
      .doc(id.toString())
      .update({ [key]: value })
      .then((obj) => {
        resolve(true);
      })
      .catch((err) => {
        reject(false);
      });
  });
};

const deleteTask = (id: number) => {
  return new Promise((resolve, reject) => {
    collection
      .doc(id.toString())
      .delete()
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(false);
      });
  });
};

const api = {
  get: getData,
  put: putData,
  updateByKeyName,
  delete: deleteTask,
};

export default api;
