def isExistKey(arr, key, value):
    for i in range(len(arr)):
        if arr[i].key == value:
            return i
    return -1