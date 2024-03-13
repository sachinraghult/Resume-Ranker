file_list=("orgs.py" "tester.py")

for py_file in "${file_list[@]}"
do
    echo "Running $py_file ..."
    python ${py_file}
done