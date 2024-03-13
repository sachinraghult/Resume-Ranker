## Ranking Algorithm
This Folder is used to keep track of and generate the **fuzzyset** files created for `academic` and `organization` criteria, and extracting 'skills'. <br>
**Fuzzyset**  is a set whose elements have degrees of memberships. It is a data structure that uses fuzzy-matching to give the nearest element with a score. Here, it is used to perform a full-text search to **determine potential mispellings** and **approximate skill matching**.

**Note**: This module is only used for creating the lists of institutions, organizations and skills created using fuzzysets and store them in a `.pth` file. 

### Quick Start
Please execute the following commands on your terminal to create the `.pth` files

- Institute 

```bash
    $ cd academic
    $ ls
    $ chmod +x run.sh
    $ ./run.sh
    $ mv institute.pth ../../../weights/
```

- Organization

```bash
    $ cd organization
    $ ls
    $ chmod +x run.sh
    $ ./run.sh
    $ mv org.pth ../../../weights/
```

- Skills

```bash
    $ cd skills
    $ ls
    $ chmod +x run.sh
    $ ./run.sh
    $ mv skills.pth ../../../weights/
```
<hr>

Check out the full documentation of [fuzzyset](https://pypi.org/project/fuzzyset/).
