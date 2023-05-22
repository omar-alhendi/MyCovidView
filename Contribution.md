# Contribution Guidelines

Welcome to MyCovidView! This guide outlines the steps you need to follow and the standards you should adhere to.

## Project Structure and Technologies Used

The project relies on the following technologies:

1. **React**: The main framework for building user interfaces.
2. **Vite**: A modern front-end build tool.
3. **React-Router**: The routing library for our React application.
4. **React-Carbon-Components**: A component library following the Carbon Design System.
5. **Carbon Charts**: A charting library based on the Carbon Design System.

The main project directories are as follows:

- `UI`: Shared React Components.
- `Layout`: Components for major page structures such as headers, footers, sidebars and Containers.
- `Pages`: Components that constitute a full page in the application.
- `Loaders`: loader functions which are passed to the pages routes.
- `Utils`: Utility functions and reusable code, including the `Fetcher` function.
- `Types`: TypeScript type definitions.

## Contribution Steps

Here's a step-by-step guide on how to contribute:

- Create a page for your group in the pages folder
- Create a route for your page in the `app.tsx` file
- Use the `fectcher` function which is available in the `uilts` folder to fetch your csv files
- The `fetcher` function takes one argument which is the directory name and the file name e.g `static/population.csv`
- Minipulate the data according to your chart
- Make a loader function in the `loaders` file that retuns **only the required data**
- Pass the loader function to your Route

**you may refer to the feedback page to see how it is created**

### 1. Clone the Repository

Clone the repository to your local machine.

```bash
git clone https://github.com/omar-al-hendi/MyCovidView.git
```

### 2. Install Dependencies

Navigate into the project directory and install the required dependencies:

```bash
cd <Repository Name>
npm install
```

### 3. Create a Branch

Before making changes, create a new branch:

```bash
git checkout -b <group-number-<your title>>
```

### 4. Make Changes

Develop your group's page according to the project task above.

### 5. Commit Your Changes

Once your changes are done, commit them with a meaningful commit message:

```bash
git commit -m "Add a brief description of your changes" 
```

### 6. Push your changes to your branch:

```bash
git push origin <branch-name>
```

### 7. Submit a Pull Request

Open a pull request on the original repository. Make sure your pull request describes what you have done and aligns with the project task.

## Code Reviews

Once your pull request is submitted, It should be reviewed by your group leader, and one of the code maintainers. You might be asked to make changes based on the review. Make any necessary changes and recommit to your branch. The changes will be added to the pull request. Once your pull request is approved, it will be merged into the main project repository.
