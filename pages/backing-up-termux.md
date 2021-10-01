---
title: Backing up Termux
---

This page shows an example of backing up your Termux installation.
Instructions listed there cover basic usage of archiving utility "tar"
as well as show which files should be archived. **It is highly
recommended to understand what the listed commands do before
copy-pasting them.** Misunderstanding the purpose of each step may
irrecoverably damage your data. If that happened to you - do not
complain.

## Backing up

In this example, a backup of both home and sysroot will be shown. The
resulting archive will be stored on your shared storage (`/sdcard`) and
compressed with `gzip`.

1. Ensure that storage permission is granted:
```shell
$ termux-setup-storage
```
2. Backing up files:
```shell
$ tar -zcf /sdcard/termux-backup.tar.gz -C /data/data/com.termux/files ./home ./usr
```
Backup should be finished without any error. There shouldn't be any
permission denials unless the user abused root permissions. If you got
some warnings about socket files, ignore them.

**Warning**: never store your backups in Termux private directories.
Their paths may look like:

|                                            |                                                                                    |
|--------------------------------------------|--------------------------------------------------------------------------------------------|
| /data/data/com.termux                      | private Termux directory on internal storage                                               |
| /sdcard/Android/data/com.termux            | private Termux directory on shared storage                                                 |
| /storage/XXXX-XXXX/Android/data/com.termux | private Termux directory on external storage, XXXX-XXXX is the UUID of your micro-sd card. |
| ${HOME}/storage/external-1                 | alias for Termux private directory on your micro-sd.                                       |

Once you clear Termux data from settings, these directories are erased
too.

## Restoring

Here will be assumed that you have backed up both home and usr directory
into same archive. Please note that all files would be overwritten
during the process.

1. Ensure that storage permission is granted:
```shell
$ termux-setup-storage
```
2. Extract home and usr with overwriting everything. Pass
`--recursive-unlink` to remove any junk and orphaned files. Pass
`--preserve-permissions` to set file permissions as in archive, ignoring
the umask value. By combining these extra options you will get
installation state exactly as was in archive.
```shell
$ tar -zxf /sdcard/termux-backup.tar.gz -C /data/data/com.termux/files --recursive-unlink --preserve-permissions
```
Now close Termux with the "exit" button from notification and open it
again.
