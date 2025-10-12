import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import CreateIcon from "@mui/icons-material/Create";
// other
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
// health
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// shopping
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
// personal
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// work
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
// date
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";

import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";

// ...existing code...
// import { ToDoContext } from "../ToDo List Context/ToDoContext";

export default function Task({ task, onDelete, onEdit, onCompleted, Checked }) {
  // const TaskInfos = task || {};
  const categ = task.Category;
  const prior = task.Priority;

  return (
    <div
      className={`bg-cyan-100 w-full flex items-center justify-start rounded-lg px-3 border-s-4 ${
        prior === "High"
          ? "border-red-500"
          : prior === "Medium"
          ? "border-orange-400"
          : "border-green-400"
      } py-3 mb-3`}
    >
      <Checkbox
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<RadioButtonCheckedIcon />}
        checked={Checked}
        onChange={onCompleted}
      />
      <Grid container rowSpacing={0.5} columnSpacing={1} className="text-left">
        <Grid size={12}>
          <h4
            className={`text-xl font-semibold ${
              Checked ? "line-through opacity-50" : ""
            }`}
          >
            {task.Title}
          </h4>
        </Grid>
        <Grid item xs={4}>
          {prior === "High" ? (
            <p
              className={`text-sm flex items-center gap-1 text-red-400 ${
                Checked ? "line-through opacity-60" : ""
              }`}
            >
              <OutlinedFlagIcon fontSize="small" />
              High
            </p>
          ) : prior === "Medium" ? (
            <p
              className={`text-sm flex items-center gap-1 text-orange-400 ${
                Checked ? "line-through opacity-60" : ""
              }`}
            >
              <OutlinedFlagIcon fontSize="small" />
              Medium
            </p>
          ) : (
            <p
              className={`text-sm flex items-center gap-1 text-green-400 ${
                Checked ? "line-through opacity-60" : ""
              }`}
            >
              <OutlinedFlagIcon fontSize="small" />
              Low
            </p>
          )}
        </Grid>
        <Grid item xs={4}>
          {categ === "Personal" ? (
            <p
              className={`text-sm flex items-center gap-1 text-slate-500 ${
                Checked ? "line-through opacity-50" : ""
              }`}
            >
              <PersonOutlineOutlinedIcon fontSize="small" />
              Personal
            </p>
          ) : categ === "Work" ? (
            <p
              className={`text-sm flex items-center gap-1 text-slate-500 ${
                Checked ? "line-through opacity-50" : ""
              }`}
            >
              <BusinessCenterOutlinedIcon fontSize="small" />
              Work
            </p>
          ) : categ === "Shopping" ? (
            <p
              className={`text-sm flex items-center gap-1 text-slate-500 ${
                Checked ? "line-through opacity-50" : ""
              }`}
            >
              <AddShoppingCartOutlinedIcon fontSize="small" />
              Shopping
            </p>
          ) : categ === "Health" ? (
            <p
              className={`text-sm flex items-center gap-1 text-slate-500 ${
                Checked ? "line-through opacity-50" : ""
              }`}
            >
              <FavoriteBorderOutlinedIcon fontSize="small" />
              Health
            </p>
          ) : (
            <p
              className={`text-sm flex items-center gap-1 text-slate-500 ${
                Checked ? "line-through opacity-50" : ""
              }`}
            >
              <FolderOpenOutlinedIcon fontSize="small" />
              Other
            </p>
          )}
        </Grid>
        <Grid item xs={4}>
          <p
            className={`text-sm flex items-center gap-1 text-slate-500 ${
              Checked ? "line-through opacity-50" : ""
            }`}
          >
            <DateRangeOutlinedIcon fontSize="small" />
            {task.DueDate}
          </p>
        </Grid>
      </Grid>

      {/* buttons */}
      <div className="ml-auto">
        {/* Edit */}
        <Tooltip title="Edit" placement="top" arrow>
          <CreateIcon
            fontSize="large"
            className="text-slate-500 ml-auto transition-all duration-300 ease-in-out cursor-pointer hover:text-teal-700"
            onClick={!Checked ? onEdit : undefined}
          />
        </Tooltip>

        {/* Delete */}
        <Tooltip title="Delete" placement="top" arrow>
          <DeleteForeverOutlinedIcon
            fontSize="large"
            className="text-slate-500 ml-auto transition-all duration-300 ease-in-out cursor-pointer hover:text-red-700"
            onClick={onDelete}
          />
        </Tooltip>
      </div>
    </div>
  );
}
