const Class = require("../models/classes.model");

const createClasses = async (req, res) => {
  const { classType, capacity, startTime } = req.body;

  try {
    let classItem = await Class.create({
      type: classType,
      capacity: capacity,
      bookedSlots: 0,
      waitlist: [],
      startTime: new Date(startTime),
    });

    return res.status(200).send(classItem);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const bookClasses = async (req, res) => {
  const { classId, userId } = req.body;
  try {
    let classItem = await Class.findById(classId);
    if (!classItem) {
      res.status(400).send("Class not found");
    }

    if (classItem.bookedSlots < classItem.capacity) {
      classItem.bookedSlots += 1;
      classItem.bookedBy.push(userId);
    } else {
      classItem.waitlist.push(userId);
    }

    const updatedList = await Class.findByIdAndUpdate(classId, classItem, {
      new: true,
    })
      .lean()
      .exec();

    res.status(200).send(updatedList);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const cancelClass = async (req, res) => {
  const { classId, userId } = req.body;
  try {
    const classItem = await Class.findById(classId);
    if (!classItem) {
      return res.status(404).send("Class not found");
    }

    const timeDifference =
      (new Date(classItem.startTime) - new Date()) / (1000 * 60);
    if (timeDifference <= 30) {
      return res
        .status(400)
        .send("Cannot cancel within 30 minutes of class start time");
    }

    // Check if the user is in the bookedBy list
    const isUserBooked = classItem.bookedBy.includes(userId);

    // Check if the user is in the waitlist
    const isUserWaitlisted = classItem.waitlist.includes(userId);

    if (isUserBooked) {
      // If the user is in the bookedBy list, remove them and handle waitlist
      classItem.bookedSlots -= 1;
      classItem.bookedBy = classItem.bookedBy.filter((user) => user !== userId);
      if (classItem.waitlist.length > 0) {
        const nextUser = classItem.waitlist.shift();
        classItem.bookedSlots += 1;
        classItem.bookedBy.push(nextUser);
      }
    } else if (isUserWaitlisted) {
      // If the user is in the waitlist, remove them
      classItem.waitlist = classItem.waitlist.filter((user) => user !== userId);
    } else {
      // If the user is neither in the bookedBy list nor in the waitlist
      return res
        .status(400)
        .send("User is not booked or waitlisted for this class");
    }

    const updatedList = await Class.findByIdAndUpdate(classId, classItem)
      .lean()
      .exec();

    res.status(200).send("Cancellation successful");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const getClassesById = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id).lean().exec();
    return res.status(200).send(classItem);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getClassesFilter = async (req, res) => {
  const { type, date } = req.query;

  try {
    let query = {};
    if (type) {
      query.type = type;
    }
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.startTime = { $gte: startDate, $lt: endDate };
    }

    const classes = await Class.find(query);
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const allClasses = async (req, res) => {
  try {
    const classes = await Class.find({});
    res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getUserClasses = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).send("UserId is required");
  }

  try {
    const classes = await Class.find({
      $or: [{ bookedBy: userId }, { waitlist: userId }],
    });

    res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  createClasses,
  cancelClass,
  getClassesFilter,
  bookClasses,
  allClasses,
  getClassesById,
  getUserClasses,
};
