const preferencesCategories = [
    {
        key: 'Jacksoxn',
        id: 0,
        image: require("../../assets/images/preferences/mbbs.webp").default,
        fadedImage:require("../../assets/images/preferences/mbbs-fade.webp").default,
        faculty:'MBBS',
        fullName:"Bachelor of Medicine and a Bachelor of Surgery",
        subjects:[
            {
                id:0,
                subjectName:'Basic Science'
            },
            {
                id:1,
                subjectName:'Clinical Science'
            }
        ]    
    },
    {
        key: 'Dominic',
        id: 1,
        image: require("../../assets/images/preferences/bds.webp").default,
        fadedImage:require("../../assets/images/preferences/bds-fade.webp").default,
        faculty:'BDS',
        fullName:'Bachelor of Dental Surgery',
        subjects:[
            {
                id:0,
                subjectName:'Basic Science'
            },
            {
                id:1,
                subjectName:'Clinical Science'
            },
            {
                id:2,
                subjectName:'Dental'
            }
        ]    
    },
    {
        key: 'James',
        id: 2,
        image: require("../../assets/images/preferences/nursing.webp").default,
        fadedImage:require("../../assets/images/preferences/nursing-fade.webp").default,
        faculty:'Nursing',
        fullName:'Nursing',
        subjects:[
            {
                id:0,
                subjectName:'Basic Science'
            },
            {
                id:1,
                subjectName:'Nursing'
            }
        ]    
    },
    {
        key: 'Devin',
        id: 3,
        image: require("../../assets/images/preferences/bams.webp").default,
        fadedImage:require("../../assets/images/preferences/bams-fade.webp").default,
        faculty:'BAMS',
        fullName:'Bachelor of Ayurveda, Medicine and Surgery',
        subjects:[
            {
                id:0,
                subjectName:'Basic Science'
            },
            {
                id:1,
                subjectName:'Clinical Science'
            }
        ]    
    },
    {
        key: 'Jack',
        id: 3,
        image: require("../../assets/images/preferences/physio.webp").default,
        fadedImage:require("../../assets/images/preferences/physio-fade.webp").default,
        faculty:'Physiotherapy',
        fullName:'Physiotherapy',
        subjects:[
            {
                id:0,
                subjectName:'Basic Science'
            },
            // {
            //     id:1,
            //     subjectName:'Physiotherapy'
            // }
        ]    
    },
]

export { preferencesCategories }
