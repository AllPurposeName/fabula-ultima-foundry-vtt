### Dev Setup

* Download Foundry VTT.
* Clone the repo.
* Create a foundryconfig.json (feel free to copy `foundryconfig-example.json`).
* Fill in the dataPath with the output of Foundry VTT setting's User Data Path.
  Add `/Data` to the end of this path.
* yarn install
* yarn build
* yarn link-project
* Close and reopen Foundry VTT. Fabula Ultima should appear in your Game
  Systems.

### Releasing
* Run `yarn bump -r {step}`, where step is one of: [major, premajor, minor, preminor, patch, prepatch, prerelease]
* Fill out release notes in CHANGELOG.md
* Run `yarn release`
