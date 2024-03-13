# Contribution Guidelines
We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features

## How to Contribute?
Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Once you figure out what to contribute, open an issue at [Issues](https://github.com/RameshSankarS/TEAM-B4/issues). Make sure that the issue is detailed with respect to your contribution.

![issues](https://user-images.githubusercontent.com/66861243/180181393-1e3591ad-957a-4597-a4d4-265c4c845864.png)

2. **Fork the repo** and create your branch from `main`.

![fork](https://user-images.githubusercontent.com/66861243/180182184-5a6f7cc2-13f7-43de-9fca-0606f267cbf6.png)

Since you are working on a fork, there is no need to explicitly `git checkout` to a new branch. However, upon your discretion, you may switch to a new branch by running the following command in the local repo root from your terminal,
```bash
    $ git checkout -b <branch-name>
```

3. Code! 

4. Add tests! Once you've added a piece of code, it must be tested before commit. 
  - If the contribution is a bug fix within the existing file, run the unittests that have already been added to the repo. 
  - If the contribution is a new feature, add unittests for the same in the respective folder, and run the test. 

    If all the tests pass, the code is good for merge! 

5. Add **Proper Documentation**. Docstring should be added to the added/modified files. If you're adding a new class to be initialized, please mention the initialization to the `README.md` within the directory or add usage guidelines as comments in the same file itself.

6. Once everything is done, create a [Pull Request](https://github.com/RameshSankarS/TEAM-B4/pulls). Wait for review to resolve any problems and merge!

![PR](https://user-images.githubusercontent.com/66861243/180184777-47a584be-fcc0-4001-9b79-c27671145d43.png)

